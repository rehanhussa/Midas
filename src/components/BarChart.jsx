import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { mockBarData as data } from "../data/mockData";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveBar
      data={data}
      theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "country", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "food", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;













// import { useTheme } from "@mui/material";
// import { tokens } from "../theme";
// import { mockBarData as data } from "../data/mockData";
// import { ResponsiveBoxPlot } from "@nivo/boxplot";
  
// const MyResponsiveBoxPlot = ({ isDashboard = false }) => {
//     const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   return (
//     <ResponsiveBoxPlot
//         data={data}
//         margin={{ top: 60, right: 140, bottom: 60, left: 60 }}
//         minValue={0}
//         maxValue={10}
//         subGroupBy="subgroup"
//         padding={0.12}
//         enableGridX={true}
//         axisTop={{
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             legend: '',
//             legendOffset: 36
//         }}
//         axisRight={{
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             legend: '',
//             legendOffset: 0
//         }}
//         axisBottom={{
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             legend: 'group',
//             legendPosition: 'middle',
//             legendOffset: 32
//         }}
//         axisLeft={{
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             legend: 'value',
//             legendPosition: 'middle',
//             legendOffset: -40
//         }}
//         colors={{ scheme: 'paired' }}
//         borderColor={{
//             from: 'color',
//             modifiers: [
//                 [
//                     'darker',
//                     '0.5'
//                 ]
//             ]
//         }}
//         medianWidth={8}
//         medianColor={{
//             from: 'color',
//             modifiers: [
//                 [
//                     'darker',
//                     '0.6'
//                 ]
//             ]
//         }}
//         whiskerEndSize={0.6}
//         whiskerColor={{
//             from: 'color',
//             modifiers: [
//                 [
//                     'darker',
//                     '3'
//                 ]
//             ]
//         }}
//         inactiveOpacity={0.65}
//         motionConfig="stiff"
//         legends={[
//             {
//                 anchor: 'right',
//                 direction: 'column',
//                 justify: false,
//                 translateX: 100,
//                 translateY: 0,
//                 itemWidth: 60,
//                 itemHeight: 20,
//                 itemsSpacing: 3,
//                 itemTextColor: '#999',
//                 itemDirection: 'left-to-right',
//                 symbolSize: 20,
//                 symbolShape: 'square',
//                 effects: [
//                     {
//                         on: 'hover',
//                         style: {
//                             itemTextColor: '#000'
//                         }
//                     }
//                 ]
//             }
//         ]}
//     />
// )
//     }

// export default MyResponsiveBoxPlot;