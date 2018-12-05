const ANIMATION_NAMES = ["bounce", "tada", "swing", "rubberBand"];

export const randomAnimate = (ref: HTMLElement | null) => {
    if (ref != null) {
        const id = setInterval(() => {
            if (!document.body.contains(ref)) {
                clearInterval(id);
            } else {
                const animName = ANIMATION_NAMES[Math.floor(Math.random() * ANIMATION_NAMES.length)];
                ref.classList.add(animName);
                setTimeout(() => {
                    ref.classList.remove(animName);
                }, 1000);
            }
        }, 3000);
    }
}

