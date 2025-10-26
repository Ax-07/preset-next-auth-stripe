import React from 'react';
import { ArrowRight, Zap, Lock, CreditCard, Palette, Rocket } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

export const Hero = () => {
    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-background to-secondary/20">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 rounded-full blur-3xl opacity-50" />
            
            <div className="container relative mx-auto px-4 py-16 md:py-24 lg:py-32">
                <div className="max-w-6xl mx-auto">
                    {/* Hero Content */}
                    <div className="text-center space-y-8 mb-16">
                        {/* Badge */}
                        <div className="flex justify-center">
                            <Badge variant="secondary" className="px-4 py-2 gap-2 text-sm">
                                <Rocket className="w-4 h-4" />
                                Preset Next.js Production-Ready
                            </Badge>
                        </div>

                        {/* Main heading */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                Preset Next.js
                            </span>
                            <span className="block mt-2 bg-gradient-to-r from-primary via-purple-600 to-blue-600 dark:from-primary dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                                Better Auth + Stripe
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Démarrez votre SaaS en quelques minutes avec une authentification sécurisée, 
                            des paiements intégrés et des composants UI modernes.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Button size="lg" className="group gap-2">
                                <Zap className="w-4 h-4" />
                                Démarrer maintenant
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button size="lg" variant="outline">
                                Voir la documentation
                            </Button>
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
                            <Badge variant="outline" className="gap-2 px-4 py-2 font-mono text-xs">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/>
                                </svg>
                                Next.js 15
                            </Badge>
                            <Badge variant="outline" className="gap-2 px-4 py-2 font-mono text-xs">
                                <Lock className="w-4 h-4" />
                                Better Auth
                            </Badge>
                            <Badge variant="outline" className="gap-2 px-4 py-2 font-mono text-xs">
                                <CreditCard className="w-4 h-4" />
                                Stripe
                            </Badge>
                            <Badge variant="outline" className="gap-2 px-4 py-2 font-mono text-xs">
                                <Palette className="w-4 h-4" />
                                shadcn/ui
                            </Badge>
                        </div>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <Card className="relative group overflow-hidden p-6 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative space-y-3">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Lock className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="font-semibold text-lg">Authentification complète</h3>
                                <p className="text-sm text-muted-foreground">
                                    Better Auth intégré avec email/mot de passe, OAuth, 2FA et gestion des sessions
                                </p>
                            </div>
                        </Card>

                        <Card className="relative group overflow-hidden p-6 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative space-y-3">
                                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                    <CreditCard className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h3 className="font-semibold text-lg">Paiements Stripe</h3>
                                <p className="text-sm text-muted-foreground">
                                    Abonnements, checkout et webhooks configurés. Portal client inclus
                                </p>
                            </div>
                        </Card>

                        <Card className="relative group overflow-hidden p-6 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative space-y-3">
                                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <Palette className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="font-semibold text-lg">UI shadcn/ui</h3>
                                <p className="text-sm text-muted-foreground">
                                    Composants accessibles et personnalisables avec mode sombre natif
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </section>
    );
};
