import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';

type Side = 'left' | 'right';

export function useTooltipPosition(
  wrapperRef: React.RefObject<HTMLElement>,
  tooltipRef: React.RefObject<HTMLElement>,
) {
  const [side, setSide] = useState<Side>('right');

  useEffect(() => {
    function updatePosition() {
      const wrapper = wrapperRef.current;
      const tooltip = tooltipRef.current;
      if (!wrapper || !tooltip) return;

      const rect = wrapper.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();

      const spaceRight = window.innerWidth - (rect.right + rect.width);
      console.log(window.innerWidth, rect.right, rect.width);
      if (spaceRight < tooltipRect.width + 15) {
        setSide('left');
      } else {
        setSide('right');
      }
    }

    const debouncedUpdate = debounce(updatePosition, 500);

    updatePosition();

    window.addEventListener('resize', debouncedUpdate);
    return () => {
      window.removeEventListener('resize', debouncedUpdate);
      debouncedUpdate.cancel();
    };
  }, [wrapperRef, tooltipRef]);

  return side;
}
