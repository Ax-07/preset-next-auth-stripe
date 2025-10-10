"use client";

import { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  Elements,
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCartStore } from "@/src/stores/cart.store";
import IconVisa from "@/src/assets/payment-icon/visa.svg";
import IconMastercard from "@/src/assets/payment-icon/mastercard.svg";
import IconCvc from "@/src/assets/payment-icon/cvc.svg";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutForm({
  clientSecret,
}: {
  clientSecret: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardholderName, setCardholderName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const cardNumberElement = elements.getElement(CardNumberElement);
    

    const { error } = await stripe.confirmCardPayment(
      // clientSecret is passed via <Elements />
      clientSecret,
      {
        payment_method: {
          card: cardNumberElement!,
          billing_details: {
            name: cardholderName,
          },
          metadata: {
            items: JSON.stringify(useCartStore.getState().items),
          },
        },
        return_url: `${window.location.origin}/panier/commande/paiement/confirmation`,
      }
    );

    if (error) {
      setMessage(error.message || "Une erreur est survenue");
    } else {
      window.location.href = "/success"; // Rediriger vers la page de succès
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="text-white space-y-4">
      <div>
        <label className="block mb-1 font-medium">Nom du titulaire</label>
        <input
          type="text"
          required
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          placeholder="Jean Dupont"
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Carte bancaire</label>
        <div className="relative bg-gray-800 p-3 rounded border border-gray-600 focus-within:ring-2 focus-within:ring-blue-500">
          <CardNumberElement
            options={{
              style: {
                base: {
                  color: "#fff",
                  fontSize: "16px",
                  fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                  "::placeholder": { color: "#a0aec0" },
                },
                invalid: {
                  color: "#fa755a",
                },
              },
            }}
          />
          <div className="absolute top-2 right-3 flex space-x-2">
            <IconVisa className="size-7" />
            <IconMastercard className="size-7" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block mb-1 font-medium">Date d'expiration</label>
          <div className="bg-gray-800 p-3 rounded border border-gray-600 focus-within:ring-2 focus-within:ring-blue-500">
            <CardExpiryElement
              options={{
                style: {
                  base: {
                    color: "#fff",
                    fontSize: "16px",
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    "::placeholder": { color: "#a0aec0" },
                  },
                  invalid: {
                    color: "#fa755a",
                  },
                },
              }}
            />
          </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">CVC</label>
          <div className="relative bg-gray-800 p-3 rounded border border-gray-600 focus-within:ring-2 focus-within:ring-blue-500">
            <CardCvcElement
              options={{
                placeholder: "135",
                style: {
                  base: {
                    color: "#fff",
                    fontSize: "16px",
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    "::placeholder": { color: "#a0aec0" },
                  },
                  invalid: {
                    color: "#fa755a",
                  },
                },
              }}
            />
            <div className="absolute top-1 right-3 flex space-x-2">
              <IconCvc className="size-9" />
            </div>
          </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !stripe || !elements}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded font-semibold transition duration-200 disabled:opacity-50"
      >
        {loading ? "Traitement…" : "Payer"}
      </button>

      {message && (
        <div className="p-3 bg-red-500 text-white rounded">{message}</div>
      )}
    </form>
  );
}

export const PaymentComponent = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const items = useCartStore.getState().items;

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({ items }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <div className="w-full mx-auto bg-[#111827] p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-white mb-6">Paiement sécurisé</h1>
      {clientSecret ? (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: "flat",
              variables: {
                colorPrimary: "#3b82f6",
                colorBackground: "#1f2937",
                colorText: "#ffffff",
              },
            },
          }}
        >
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      ) : (
        <p className="text-gray-300">Chargement du formulaire…</p>
      )}
    </div>
  );
};
