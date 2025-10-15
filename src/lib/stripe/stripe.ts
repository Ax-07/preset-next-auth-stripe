import Stripe from "stripe"

export const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
})

// Juste pour vérifier que la connexion fonctionne et lister les plans
// const stripePlans = await stripeClient.plans.list().then(plans => {
//   console.log("Plans in Stripe:", plans.data);
// }).catch(err => {
//   console.error("Error fetching plans from Stripe:", err);
// });

// Juste pour vérifier que la connexion fonctionne et lister les produits
// const stripeProducts = await stripeClient.products.list().then(products => {
//   console.log("Products in Stripe:", products.data);
// }).catch(err => {
//   console.error("Error fetching products from Stripe:", err);
// });

