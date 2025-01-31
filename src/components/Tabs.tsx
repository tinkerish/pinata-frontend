import { FC, Suspense } from "react";
import { TabComponent } from "../types/common";
interface TabsComponentProps {
  value: number;
  onChange: (value: number) => void;
  tabs: TabComponent[];
  tabHeaderClassName?: string;
  tabClassName?: string;
  fullWidth?: boolean;
}
export const Tabs: FC<TabsComponentProps> = ({
  value,
  onChange,
  tabs,
  tabHeaderClassName,
  tabClassName,
  fullWidth,
}) => {
  const TabsLazyComponent = tabs[value].component;
  const componentProps = tabs[value].props;

  return (
    <div
      role="tab"
      className={`bg-white p-4 max-w-[85%] flex flex-col gap-4 max-sm:w-[85%] w-[80%] justify-between ${
        fullWidth ? "w-full max-w-full max-sm:w-[100%]" : ""
      }`}
    >
      <div
        className={`flex items-center justify-end gap-2 ${tabHeaderClassName}`}
        role="tablist"
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            title={tab.title}
            onClick={onChange}
            active={index === value}
            index={index}
            tabClassName={tabClassName}
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
  tabClassName?: string;
}
export const Tab: FC<TabProps> = ({
  title,
  onClick,
  active,
  index,
  tabClassName,
}) => {
  return (
    <div
      aria-selected={active}
      aria-controls={`tabpanel-${index}`}
      id={`tab-${index}`}
      className={`cursor-pointer ${tabClassName}`}
    >
      <button
        className={`w-full p-2 rounded-md ${
          active ? "bg-[#e3752c] text-white" : ""
        }`}
        onClick={() => onClick(index)}
      >
        {title}
      </button>
    </div>
  );
};
