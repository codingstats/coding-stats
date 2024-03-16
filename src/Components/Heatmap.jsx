import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import {useState} from "react";

function Heatmap({heatmapData, year}) {
    const values = Object.keys(heatmapData).map((key) => {
        const timestamp = parseInt(key);
        const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
        return {date: formattedDate, count: heatmapData[key]};
    });

    const [tooltipData, setTooltipData] = useState(null);

    const handleCellHover = (event, value) => {
        if (!value) {
            setTooltipData(null);
            return;
        }
        setTooltipData({value, x: event.pageX, y: event.pageY});
    };

    const handleCellLeave = () => {
        setTooltipData(null);
    };

    return (<div style={{height: "200px"}}>
        <CalendarHeatmap

            startDate={new Date(`${year}-01-01`)}
            endDate={new Date(`${year}-12-31`)}
            values={values}
            classForValue={(value) => {
                if (!value) {
                    return "color-empty";
                }
                switch (value.count) {
                    case 1:
                    case 2:
                    case 3:
                        return `color-scale-1`;
                    case 4:
                    case 5:
                        return `color-scale-2`;
                    case 7:
                    case 8:
                        return `color-scale-3`;
                }
                return `color-scale-4`;
            }}
            tooltipDataAttrs={(value) => {
                return {
                    'data-tip': value.date,
                };
            }}
            showMonthLabels={true}
            onMouseOver={handleCellHover}
            onMouseLeave={handleCellLeave}
        />
        {tooltipData && (<div style={{
            position: 'absolute',
            color: "white",
            backgroundColor: "black",
            fontSize: "18px",
            padding: "4px",
            top: tooltipData.y,
            left: tooltipData.x + 20
        }}>
            {tooltipData.value.count} submissions on {tooltipData.value.date}
        </div>)}
    </div>);
}

export default Heatmap;
