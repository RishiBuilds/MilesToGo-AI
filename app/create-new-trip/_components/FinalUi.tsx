'use client';
import { Globe2, Loader2, CheckCircle } from "lucide-react";

type Props = {
    viewTrip: () => void;
    disable: boolean;
};

function FinalUi({ viewTrip, disable }: Props) {
    return (
        <div className="panel flex flex-col items-center justify-center p-5 mt-3 animate-fade-in">
            {disable ? (
                <>
                    {/* Loading state */}
                    <div className="p-3 rounded-lg bg-card border border-border">
                        <Globe2 className="h-6 w-6 text-primary animate-spin" aria-hidden="true" />
                    </div>

                    <h3 className="mt-3 text-sm font-medium text-foreground">
                        Creating your trip...
                    </h3>

                    <p className="text-xs text-muted-foreground text-center mt-1 max-w-xs">
                        Finding the best destinations and accommodations for you
                    </p>

                    {/* Loading dots */}
                    <div className="loading-dots mt-3">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </>
            ) : (
                <>
                    {/* Success state */}
                    <div className="p-3 rounded-lg bg-success-muted border border-success/20">
                        <CheckCircle className="h-6 w-6 text-success" aria-hidden="true" />
                    </div>

                    <h3 className="mt-3 text-sm font-medium text-foreground">
                        Your trip is ready!
                    </h3>

                    <p className="text-xs text-muted-foreground text-center mt-1">
                        We've crafted a personalized itinerary based on your preferences
                    </p>

                    <button
                        onClick={viewTrip}
                        className="mt-4 w-full px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                        View Your Trip
                    </button>
                </>
            )}
        </div>
    );
}

export default FinalUi;