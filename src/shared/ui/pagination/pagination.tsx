'use client';
import { Button } from '@/shared/ui';
import React, { useEffect, useRef } from 'react';
import styles from './pagination.module.css';

interface PagiProps {
  children: React.ReactNode;
  moveLeftFunc?: () => void;
  moveRightFunc?: () => void;
  isNextDisabled?: boolean;
  isPrevDisabled?: boolean;
  scrollToActive?: boolean;
}

function Pagination({
  children,
  moveLeftFunc,
  moveRightFunc,
  isPrevDisabled,
  isNextDisabled,
  scrollToActive,
}: PagiProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollByAmount = 200;
  const hasScrolled = useRef(false);

  const handleScrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -scrollByAmount, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    scrollRef.current?.scrollBy({ left: scrollByAmount, behavior: 'smooth' });
  };

  useEffect(() => {
    if (hasScrolled.current) return;
    if (!scrollToActive || !scrollRef.current) return;

    const activeBtn = scrollRef.current.querySelector('[data-active="true"]') as HTMLElement;
    
    if (activeBtn) {
      const container = scrollRef.current
      const containerRect = container.getBoundingClientRect()
      const activeRect = activeBtn.getBoundingClientRect()

      const relativeLeft = activeRect.left - containerRect.left
      const elementCenter = relativeLeft + activeRect.width / 2
      const containerCenter = container.clientWidth / 2

      const scrollAmount = container.scrollLeft + elementCenter - containerCenter

      container.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      })

      hasScrolled.current = true
    }
  }, [children]);

  return children ? ( 
    <nav className={styles.scrollable}>
      <Button
        variant="secondary"
        onClick={moveLeftFunc || handleScrollLeft}
        disabled={isPrevDisabled}
      >
        ←
      </Button>
      <div ref={scrollRef} className={styles.scrollableContent}>
        {children}
      </div>
      <Button
        variant="secondary"
        onClick={moveRightFunc || handleScrollRight}
        disabled={isNextDisabled}
      >
        →
      </Button>
    </nav>
  ) : <>...</>;
}

export default Pagination;
