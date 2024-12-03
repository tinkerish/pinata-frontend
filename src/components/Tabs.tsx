import { lazy, Suspense } from "react";

export const Tabs = ({ value, onChange, tabs }) => {
  const TabsLazyComponent = lazy(() => import(tabs[value].component));
  return (
    <div
      role="tab"
      className="bg-white p-4 min-w-[80%] min-h-[85vh] overflow-y-scroll flex flex-col"
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
      <div role="tabpanel" className="flex-grow flex flex-col">
        <Suspense fallback={<div>Loading...</div>}>
          <TabsLazyComponent
            id={`tabpanel-${value}`}
            ariaLabelledby={`tab-${value}`}
          />
        </Suspense>
      </div>
    </div>
  );
};
export const Tab = ({ title, onClick, active, index }) => {
  return (
    <div aria-controls={`tabpanel-${index}`} id={`tab-${index}`}>
      <button
        className={`${active ? "text-red-800" : ""}`}
        onClick={() => onClick(index)}
      >
        {title}
      </button>
    </div>
  );
};
