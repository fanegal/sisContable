import React, {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import "./tabs.scss";
import { useTheme } from "../../../context/ThemeContext";

interface TabItem {
  id: string;
  label: string;
  component: React.ReactNode;
  extraInfo?: any;
  extraClass?: string;
}

interface TabsProps {
  tabs: TabItem[];
  onTabChange?: (index: number) => void;
  indicatorWidth?: number;
  extraClass?: string;
}

export interface TabsRef {
  openTab: (index: number) => void;
}

const Tabs = forwardRef<TabsRef, TabsProps>(
  ({ tabs, onTabChange, indicatorWidth = 12, extraClass }, ref) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
    const indicatorRef = useRef<HTMLDivElement | null>(null);
    const { theme } = useTheme();

    const updateIndicator = () => {
      const currentTab = tabRefs.current[activeIndex];
      if (currentTab && indicatorRef.current) {
        const { offsetLeft, clientWidth } = currentTab;
        const left = offsetLeft + clientWidth / 2 - indicatorWidth / 2;
        indicatorRef.current.style.left = `${left}px`;
        indicatorRef.current.style.width = `${indicatorWidth}px`;
      }
    };

    useEffect(() => {
      updateIndicator();
      window.addEventListener("resize", updateIndicator);
      return () => window.removeEventListener("resize", updateIndicator);
    }, [activeIndex]);

    useImperativeHandle(ref, () => ({
      openTab: (index: number) => {
        if (index >= 0 && index < tabs.length) {
          setActiveIndex(index);
          onTabChange?.(index);
        }
      },
    }));

    const handleClick = (i: number) => {
      setActiveIndex(i);
      onTabChange?.(i);
    };

    return (
      <div className={`tabs-container ${extraClass}`}>
        <div className="tabs-header">
          {tabs.map((tab, i) => (
            <div
              key={tab.id}
              ref={(el) => {
                if (el) tabRefs.current[i] = el;
              }}
              className={`tab-title ${i === activeIndex ? "active" : ""} ${
                tab.extraClass || ""
              }`}
              onClick={() => handleClick(i)}
              style={{
                color: i === activeIndex ? theme.primary : "#A7A7A8",
              }}
            >
              {tab.label}
            </div>
          ))}
          <div className="tab-indicator" ref={indicatorRef} />
        </div>

        <div className="tabs-content-wrapper">
          {tabs.map((tab, i) => (
            <div
              key={tab.id}
              className={`tabs-content-panel ${
                i === activeIndex ? "active" : ""
              }`}
            >
              {tab.component}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

Tabs.displayName = "Tabs";

export default Tabs;
