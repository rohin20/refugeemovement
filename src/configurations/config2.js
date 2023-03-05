let config2 = {
  version: "v1",
  config: {
    visState: {
      filters: [
        {
          dataId: "rohin",
          id: "pk8adw9om",
          name: ["Country of origin"],
          type: "multiSelect",
          value: ["Afghanistan"],
          enlarged: false,
          plotType: "histogram",
          animationWindow: "free",
          yAxis: null,
          speed: 1,
        },
      ],
      layers: [
        {
          id: "1onebpr",
          type: "point",
          config: {
            dataId: "rohin",
            label: "origin",
            color: [255, 203, 153],
            highlightColor: [252, 242, 26, 255],
            columns: { lat: "lat", lng: "long", altitude: null },
            isVisible: true,
            visConfig: {
              radius: 10,
              fixedRadius: false,
              opacity: 0.8,
              outline: true,
              thickness: 2,
              strokeColor: [245, 113, 65],
              colorRange: {
                name: "ColorBrewer Purples-6",
                type: "singlehue",
                category: "ColorBrewer",
                colors: [
                  "#f2f0f7",
                  "#dadaeb",
                  "#bcbddc",
                  "#9e9ac8",
                  "#756bb1",
                  "#54278f",
                ],
              },
              strokeColorRange: {
                name: "Global Warming",
                type: "sequential",
                category: "Uber",
                colors: [
                  "#5A1846",
                  "#900C3F",
                  "#C70039",
                  "#E3611C",
                  "#F1920E",
                  "#FFC300",
                ],
              },
              radiusRange: [0, 50],
              filled: true,
            },
            hidden: false,
            textLabel: [],
          },
          visualChannels: {
            colorField: { name: "Year", type: "integer" },
            colorScale: "quantile",
            strokeColorField: null,
            strokeColorScale: "quantile",
            sizeField: null,
            sizeScale: "linear",
          },
        },
        {
          id: "on4t6xh",
          type: "arc",
          config: {
            dataId: "rohin",
            label: "Country of Origin->Asylum",
            color: [146, 38, 198],
            highlightColor: [252, 242, 26, 255],
            columns: {
              lat0: "lat",
              lng0: "long",
              lat1: "Latitude",
              lng1: "Longitude",
            },
            isVisible: true,
            visConfig: {
              opacity: 0.8,
              thickness: 2,
              colorRange: {
                name: "ColorBrewer Blues-6",
                type: "singlehue",
                category: "ColorBrewer",
                colors: [
                  "#eff3ff",
                  "#c6dbef",
                  "#9ecae1",
                  "#6baed6",
                  "#3182bd",
                  "#08519c",
                ],
              },
              sizeRange: [2, 10],
              targetColor: null,
            },
            hidden: false,
            textLabel: [
              {
                field: null,
                color: [255, 255, 255],
                size: 18,
                offset: [0, 0],
                anchor: "start",
                alignment: "center",
              },
            ],
          },
          visualChannels: {
            colorField: {
              name: "Refugees under UNHCRs mandate",
              type: "integer",
            },
            colorScale: "quantile",
            sizeField: {
              name: "Refugees under UNHCRs mandate",
              type: "integer",
            },
            sizeScale: "linear",
          },
        },
      ],
      interactionConfig: {
        tooltip: {
          fieldsToShow: {
            rohin: [
              { name: "Year", },
              { name: "Country of origin" },
              { name: "Country of asylum"},
              { name: "Refugees under UNHCRs mandate"},
            ]
          },
          compareMode: false,
          compareType: "absolute",
          enabled: true,
        },
        brush: { enabled: false },
        geocoder: { enabled: false },
        coordinate: { enabled: false },
      },
      layerBlending: "normal",
      splitMaps: [],
      animationConfig: { currentTime: null, speed: 1 },
    },
    mapState: {
      bearing: 0,
      dragRotate: false,
      latitude: 20.99087011392356,
      longitude: 51.18520018337793,
      pitch: 0,
      zoom: 2.6419756514718338,
      isSplit: false,
    },
    mapStyle: {
      styleType: "dark",
      topLayerGroups: { label: true },
      visibleLayerGroups: {
        label: true,
        road: false,
        border: false,
        building: true,
        water: true,
        land: true,
        "3d building": false,
      },
      threeDBuildingColor: [
        9.665468314072013, 17.18305478057247, 31.1442867897876,
      ],
      mapStyles: {},
    },
  },
};

export default config2