import { FC, Suspense } from "react";
import { TabComponent } from "../types/common";
interface TabsComponentProps {
  value: number;
  onChange: (value: number) => void;
  tabs: TabComponent[];
}
export const Tabs: FC<TabsComponentProps> = ({ value, onChange, tabs }) => {
  const TabsLazyComponent = tabs[value].component;
  const componentProps = tabs[value].props;

  return (
    <div
      role="tab"
      className="bg-white p-4 max-w-[85%] flex flex-col max-sm:w-[85%] w-[80%] justify-between"
    >
      <div className="flex items-center justify-end gap-2" role="tablist">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            title={tab.title}
            onClick={onChange}
            active={index === value}
            index={index}
          />
        ))}
      </div>
      <div role="tabpanel" className="flex flex-col max-h-[95%] h-[95%]">
        <Suspense fallback={<div>Loading...</div>}>
          <TabsLazyComponent
            {...{
              ...componentProps,
              id: `${componentProps.id}-${value}`,
              ariaLabelledBy: `${componentProps.ariaLabelledBy}-${value}`,
            }}
          />
        </Suspense>
      </div>
    </div>
  );
};
interface TabProps {
  title: string;
  onClick: (index: number) => void;
  active: boolean;
  index: number;
}
export const Tab: FC<TabProps> = ({ title, onClick, active, index }) => {
  return (
    <div
      aria-selected={active}
      aria-controls={`tabpanel-${index}`}
      id={`tab-${index}`}
    >
      <button
        className={`${active ? "text-red-800" : ""}`}
        onClick={() => onClick(index)}
      >
        {title}
      </button>
    </div>
  );
};
