import * as React from "react";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export function TabWrapper(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`${index}`}
        {...other}
      >
        {value === index && (
          <>
            {children}
          </>
        )}
      </div>
    );
  }