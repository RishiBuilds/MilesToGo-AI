'use client';
import { Button } from "@/components/ui/button";
import { Globe2, Loader2, CheckCircle, Sparkles } from "lucide-react";
import { motion } from "motion/react";

type Props = {
    viewTrip: () => void;
    disable: boolean;
};

function FinalUi({ viewTrip, disable }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-6 mt-3 rounded-xl border border-primary/20 bg-linear-to-br from-primary/5 to-purple-500/5"
        >
            {disable ? (
                <>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="p-3 rounded-full bg-primary/10"
                    >
                        <Globe2 className="h-8 w-8 text-primary" />
                    </motion.div>

                    <h3 className="mt-4 text-lg font-semibold text-foreground flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        Creating your dream trip...
                    </h3>

                    <p className="text-sm text-muted-foreground text-center mt-1 max-w-xs">
                        Finding the best destinations, activities, and accommodations just for you
                    </p>

                    {/* Progress dots */}
                    <div className="flex items-center gap-1.5 mt-4">
                        {[0, 1, 2].map((i) => (
                            <motion.span
                                key={i}
                                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                                className="w-2 h-2 rounded-full bg-primary"
                            />
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="p-3 rounded-full bg-emerald-500/10"
                    >
                        <CheckCircle className="h-8 w-8 text-emerald-500" />
                    </motion.div>

                    <h3 className="mt-4 text-lg font-semibold text-foreground">
                        Your trip is ready! 🎉
                    </h3>

                    <p className="text-sm text-muted-foreground text-center mt-1">
                        We've crafted a personalized itinerary based on your preferences
                    </p>

                    <Button
                        onClick={viewTrip}
                        className="mt-4 w-full gap-2 bg-linear-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 shadow-lg shadow-primary/25"
                    >
                        <Sparkles className="h-4 w-4" />
                        View Your Trip
                    </Button>
                </>
            )}
        </motion.div>
    );
}

export default FinalUi;