"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";
import { Check, Loader2, ShoppingBag } from "lucide-react";

export type AddToCartPhase = "idle" | "loading" | "added";

export type AddToCartButtonProps = Readonly<
  {
    label?: string;
    loadingLabel?: string;
    addedLabel?: string;
    loadingMs?: number;
    resetMs?: number;
    icon?: ReactNode;
    loadingIcon?: ReactNode;
    addedIcon?: ReactNode;
    variant?: "default" | "whatsapp" | "emerald";
    controlledPhase?: AddToCartPhase;
  } & ComponentPropsWithoutRef<"button">
>;

// Icons stack in one fixed slot and fade with the same rhythm as the labels.
const ICON_LAYER =
  "absolute inset-0 grid place-items-center transition-opacity ease-out motion-reduce:transition-none";

// Labels stack in one grid cell; outgoing fades out, incoming fades in after.
const LABEL_LAYER =
  "col-start-1 row-start-1 text-center transition-opacity ease-out motion-reduce:transition-none";

/**
 * Reusable luxury tactile button component.
 * Features a raised 3D key effect that smoothly presses in when active/loading,
 * and emerges with solid confirmation styling when complete.
 * Supports "default" (dark luxury), "whatsapp" (rich emerald luxury), or "emerald" variants.
 */
export const AddToCartButton = forwardRef<
  HTMLButtonElement,
  AddToCartButtonProps
>(
  (
    {
      className,
      label = "Add to cart",
      loadingLabel = "Adding...",
      addedLabel = "Added to cart",
      loadingMs = 1200,
      resetMs = 1600,
      icon,
      loadingIcon,
      addedIcon,
      variant = "default",
      controlledPhase,
      onClick,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const [internalPhase, setInternalPhase] = useState<AddToCartPhase>("idle");
    const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

    useEffect(() => {
      const timeoutIds = timers;
      return () => {
        timeoutIds.current.forEach((id) => globalThis.clearTimeout(id));
      };
    }, []);

    const phase = controlledPhase ?? internalPhase;
    const idle = phase === "idle";
    const loading = phase === "loading";
    const added = phase === "added";

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (controlledPhase !== undefined) return;
      if (!idle) return;
      setInternalPhase("loading");
      timers.current.push(
        globalThis.setTimeout(() => setInternalPhase("added"), loadingMs),
        globalThis.setTimeout(() => setInternalPhase("idle"), loadingMs + resetMs),
      );
    };

    return (
      <button
        ref={ref}
        type={type}
        data-slot="add-to-cart-button"
        data-phase={phase}
        aria-busy={loading || undefined}
        aria-disabled={!idle || undefined}
        onClick={handleClick}
        className={cn(
          "inline-flex h-12 min-w-44 items-center justify-center gap-2.5 rounded-xl px-5 font-sans text-sm font-semibold outline-none select-none",
          "transition-[background-color,box-shadow,color,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
          "focus-visible:outline-2 focus-visible:outline-offset-2",

          // VARIANT: DEFAULT (Luxury Dark Key)
          variant === "default" && [
            "focus-visible:outline-neutral-900",
            idle &&
              "cursor-pointer bg-neutral-800 text-white shadow-[0_1px_1px_rgba(0,0,0,0.35),0_3px_6px_rgba(0,0,0,0.28),0_8px_16px_rgba(0,0,0,0.22),inset_0_1px_2px_rgba(255,255,255,0.14),inset_0_-3px_6px_rgba(0,0,0,0.55)] hover:bg-neutral-700 active:bg-neutral-900 active:shadow-[0_1px_2px_rgba(0,0,0,0.25),inset_0_2px_6px_rgba(0,0,0,0.55),inset_0_-1px_1px_rgba(255,255,255,0.06)]",
            loading &&
              "cursor-default bg-neutral-900 text-neutral-300 shadow-[0_1px_2px_rgba(0,0,0,0.25),inset_0_2px_6px_rgba(0,0,0,0.55),inset_0_-1px_1px_rgba(255,255,255,0.06)]",
            added &&
              "cursor-default bg-emerald-600 text-white shadow-[0_1px_1px_rgba(0,0,0,0.2),0_3px_6px_rgba(0,0,0,0.18),0_8px_16px_rgba(0,0,0,0.14),inset_0_1px_2px_rgba(255,255,255,0.2),inset_0_-3px_6px_rgba(0,0,0,0.35)]",
          ],

          // VARIANT: WHATSAPP / EMERALD (High-Conversion Tactile Key)
          (variant === "whatsapp" || variant === "emerald") && [
            "focus-visible:outline-emerald-600",
            idle &&
              "cursor-pointer bg-emerald-700 text-white shadow-[0_1px_1px_rgba(0,0,0,0.25),0_4px_8px_rgba(5,150,105,0.3),0_10px_20px_rgba(4,120,87,0.25),inset_0_1px_2px_rgba(255,255,255,0.25),inset_0_-3px_6px_rgba(0,0,0,0.35)] hover:bg-emerald-600 active:bg-emerald-800 active:shadow-[0_1px_2px_rgba(0,0,0,0.25),inset_0_2px_6px_rgba(0,0,0,0.4),inset_0_-1px_1px_rgba(255,255,255,0.08)]",
            loading &&
              "cursor-default bg-emerald-800 text-emerald-100 shadow-[0_1px_2px_rgba(0,0,0,0.25),inset_0_2px_6px_rgba(0,0,0,0.4),inset_0_-1px_1px_rgba(255,255,255,0.08)]",
            added &&
              "cursor-default bg-emerald-500 text-white shadow-[0_1px_1px_rgba(0,0,0,0.2),0_3px_6px_rgba(0,0,0,0.18),0_8px_16px_rgba(0,0,0,0.14),inset_0_1px_2px_rgba(255,255,255,0.25),inset_0_-3px_6px_rgba(0,0,0,0.3)]",
          ],

          className,
        )}
        {...props}
      >
        <span className="sr-only" aria-live="polite">
          {loading ? loadingLabel : added ? addedLabel : ""}
        </span>

        {/* Fixed icon slot keeps the icon and label aligned in every phase. */}
        <span className="relative size-4 shrink-0">
          <span
            aria-hidden
            className={cn(
              ICON_LAYER,
              idle
                ? "opacity-100 delay-200 duration-300"
                : "opacity-0 duration-200",
            )}
          >
            {icon ?? <ShoppingBag size={15} strokeWidth={2} />}
          </span>
          <span
            aria-hidden
            className={cn(
              ICON_LAYER,
              loading
                ? "opacity-100 delay-200 duration-300"
                : "opacity-0 duration-200",
            )}
          >
            {loadingIcon ?? (
              <Loader2
                size={15}
                strokeWidth={2.5}
                className="animate-spin motion-reduce:animate-none"
              />
            )}
          </span>
          <span
            aria-hidden
            className={cn(
              ICON_LAYER,
              added
                ? "opacity-100 delay-200 duration-300"
                : "opacity-0 duration-200",
            )}
          >
            {addedIcon ?? <Check size={16} strokeWidth={2.5} />}
          </span>
        </span>

        {/* Cross-fading labels keep text centered without layout shift. */}
        <span className="inline-grid items-center">
          <span
            className={cn(
              LABEL_LAYER,
              idle
                ? "opacity-100 delay-200 duration-300"
                : "opacity-0 duration-200",
            )}
          >
            {label}
          </span>
          <span
            className={cn(
              LABEL_LAYER,
              loading
                ? "opacity-100 delay-200 duration-300"
                : "opacity-0 duration-200",
            )}
          >
            {loadingLabel}
          </span>
          <span
            className={cn(
              LABEL_LAYER,
              added
                ? "opacity-100 delay-200 duration-300"
                : "opacity-0 duration-200",
            )}
          >
            {addedLabel}
          </span>
        </span>
      </button>
    );
  },
);

AddToCartButton.displayName = "AddToCartButton";

export default AddToCartButton;
