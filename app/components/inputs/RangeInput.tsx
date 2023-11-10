'use client'

import { useCallback, useRef, useState } from "react"
import { getTrackBackground, Range, useThumbOverlap } from 'react-range'

interface RangeProps {
  step?: number
  min?: number
  max?: number
  values?: number[]
  width?: number
  onChange: (value: number[]) => void
}

export const RangeInput: React.FC<RangeProps> = ({
  step = 1,
  min = 10,
  max = 100,
  values = [20],
  width = 100,
  onChange
}) => {

  const rangeRef: any = useRef<Range>();

  return (
    <div className="flex flex-row justify-center my-5">
      <Range
        ref={rangeRef}
        step={step}
        min={min}
        max={max}
        values={values}
        draggableTrack
        onChange={onChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            // onMouseDown={props.onMouseDown}
            // onTouchStart={props.onTouchStart}
            // key={}
            style={{
              ...props.style,
              background: getTrackBackground({
                values,
                colors: ['#ddd','#000', '#ddd'],
                min:min,
                max:max
              })
            }}
            className="
              w-[90%]
              h-[4px]
              bg-black
            "
          >
            {children}
          </div>
        )}
        renderThumb={({ props, index, isDragged  }) => (
          <div
            {...props}
            key={index}
            style={{
              ...props.style,
            }}
            className="
              w-[30px]
              h-[30px]
              border-[1px]
              outline-none
              border-neutral-200
              drop-shadow-lg
              rounded-full
              bg-white
              flex flex-row justify-center items-center
            "
          >
            <ThumbLabel
                rangeRef={rangeRef.current}
                values={values}
                index={index}
              />
          </div>
        )}
      />
      <div className="">
       
      </div>
    </div>
  )
}

const ThumbLabel = ({
  rangeRef,
  values,
  index,
}: {
  rangeRef: Range | null;
  values: number[];
  index: number
}) => {
  const [labelValue, style] = useThumbOverlap(rangeRef, values, index, 1, ' - ', (v) => `$ ${v}`);
  return (
    <div
      data-label={index}
      style={{
        // display: 'block',
        // position: 'absolute',
        // top: '-28px',
        // color: '#fff',
        // fontWeight: 'bold',
        // fontSize: '14px',
        // fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
        // padding: '4px',
        // borderRadius: '4px',
        // backgroundColor: '#548BF4',
        whiteSpace: 'nowrap',
        ...(style as React.CSSProperties)
      }}
      className="
        absolute
        bottom-[-40px]
        text-sm font-bold
        text-center
        p-2

      "
    >
      {labelValue as string}
    </div>
  );
};
