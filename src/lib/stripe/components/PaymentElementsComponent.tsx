import { useEffect, useState } from "react";
import {
  AddressElement,
  CurrencySelectorElement,
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCartStore } from "@/src/stores/cart.store";
import { fetchClientSecret } from "../stripe.checkout";
import { Button } from "@/src/components/ui/button";
import { getCssVariableValue } from "@/src/utils/getCssVariableValue";
import { FaSpinner } from "react-icons/fa6";

// test card stripe
// visa: 4242 4242 4242 4242 (Le paiement par carte bancaire aboutit et ne nécessite pas d’authentification.)
// visa (debit): 4000 0566 5566 5556 (Le paiement par carte bancaire aboutit et nécessite une authentification 3D Secure.)
// mastercard: 5555 5555 4444 4444 (Le paiement par carte bancaire aboutit et ne nécessite pas d’authentification.)
// visa: 4000 0000 0000 9995 (La carte est refusée avec un code de refus de type insufficient_funds.)
// maestro: 6759 6498 2643 8459
// 3d-secure: 4000 0000 0000 3063

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<String>("");
  const [isLoading, setIsLoading] = useState(false);
  const [cardholderName, setCardholderName] = useState<string>(""); // <- Ajouté
  const [ checkCGV, setCheckCGV ] = useState<boolean>(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        payment_method_data: {
          billing_details: {
            name: cardholderName, // <- Utilisé ici
            email: ""
          },
        },
        // Make sure to c://hange this to your payment completion page
        return_url: `${window.location.origin}/panier/livraison/paiement/confirmation`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message!);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="rounded-lg shadow-lg shadow-primary/20 p-6 bg-gradient-to-tl from-primary from-0% to-background to-75% ">
      {/* Champ pour le nom du titulaire */}
      <div className="flex flex-col mb-[18px]">
        <label htmlFor="cardholder-name" className="text-[14.88px] font-medium mb-1.5">
          Nom du titulaire de la carte
        </label>
        <input
          id="cardholder-name"
          type="text"
          required
          autoComplete="name"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          className="p-4.5 rounded-[5px] border border-[#27272a] focus:outline-none autofill:bg-input focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground h-[54px] shadow-[0_2px_4px_rgba(0,0,0,0.5),0_1px_6px_rgba(0,0,0,0.25)]"
          placeholder="Votre nom complet"
        />
      </div>
      <PaymentElement
        id="payment-element"
        className="bg-transparent"
        options={{
          layout: "tabs",
          fields: {
            billingDetails: { address: 'if_required' }, 
          }
        }}
      />
      <div className="flex items-center mt-4 mb-2">
        <input
          type="checkbox"
          id="checkCGV"
          checked={checkCGV}
          onChange={(e) => setCheckCGV(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="checkCGV" className="text-sm text-muted-foreground">
          J'accepte les{" "}
          <a href="/conditions-generales-de-vente" className="text-primary underline">
            conditions générales de vente
          </a>
        </label>
      </div>
      <Button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="w-full mt-6"
      >
        <span id="button-text">
          {isLoading ? <FaSpinner className="animate-spin" /> : "Payer"}
        </span>
      </Button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

interface PaymentElementComponentProps {
  isLoading?: boolean;
  stripe?: any;
  elements?: any;
}
export const PaymentElementComponent: React.FC<
  PaymentElementComponentProps
> = ({ isLoading, stripe, elements }) => {
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

  if (!clientSecret) return <p>Chargement...</p>;
  return (
    <div id="PaymentElementComponent" className="max-w-xl w-full mx-auto">
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: {
            theme: "night", // ou "flat", "stripe", etc
            variables: {
              colorPrimary: `hsl(${getCssVariableValue("--primary")})`,
              colorBackground: `hsl(${getCssVariableValue("--background")})`,
              colorText: `hsl(${getCssVariableValue("--foreground")})`,
              colorDanger: `hsl(${getCssVariableValue("--destructive")})`,
              colorSuccess: `hsl(${getCssVariableValue("--primary")})`,
              fontFamily: '"Roboto Flex", sans-serif',
              spacingUnit: "6px",
              borderRadius: getCssVariableValue("--radius-md"),
            },
            rules: {
              ".Tab, .Input, .Label, .Button, .AccordionItem, .PaymentElement":
                {
                  color: `hsl(${getCssVariableValue("--foreground")})`,
                  border: "none",
                },
              ".Input": {
                backgroundColor: `hsl(${getCssVariableValue("--input")})`,
                color: `hsl(${getCssVariableValue("--foreground")})`,
                borderColor: `hsl(${getCssVariableValue("--border")})`,
                fontFamily: '"Roboto Flex", sans-serif',
              },
              ".Input:focus": {
                borderColor: `hsl(${getCssVariableValue("--primary")})`,
                boxShadow: `0 0 0 1px hsl(${getCssVariableValue("--primary")})`,
              },
              ".Label": {
                color: `hsl(${getCssVariableValue("--foreground")})`,
              },
              ".Tab": {
                color: `hsl(${getCssVariableValue("--muted-foreground")})`,
              },
              ".Tab--selected": {
                color: `hsl(${getCssVariableValue("--primary")})`,
                borderColor: `hsl(${getCssVariableValue("--primary")})`,
              },
              ".Button": {
                backgroundColor: `hsl(${getCssVariableValue("--primary")})`,
                color: `hsl(${getCssVariableValue("--primary-foreground")})`,
                fontWeight: "600",
                fontFamily: '"Roboto Flex", sans-serif',
              },
              ".Button:disabled": {
                backgroundColor: `hsl(${getCssVariableValue("--muted")})`,
                color: `hsl(${getCssVariableValue("--muted-foreground")})`,
              },
              ".AccordionItem": {
                backgroundColor: `hsl(${getCssVariableValue(
                  "--background"
                )} / 0%)`,
                color: `hsl(${getCssVariableValue("--foreground")})`,
                boxShadow: `0 0 0 1px hsl(${getCssVariableValue("--border")})`,
                border: "none",
              },
            },
          },
        }}
      >
        <PaymentForm />
      </Elements>
    </div>
  );
};
