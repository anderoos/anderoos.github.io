// Define endpoint url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch data and log
d3.json(url).then(function(data) {
    // console.log(data);
});

// Initialize with charts
function init() {
    // Select dropdown element
    let dropdownMenu = d3.select("#selDataset");
    // Parse data
    d3.json(url).then((data) => {
        // Get name labels
        let nameLabels = data.names;


        // Append labels to dropdown
        nameLabels.forEach((id) => {
            dropdownMenu.append("option")
                .text(id)
                .property("value", id);
        });

        // Initialize charts with first patient
        let patient_one = nameLabels[0];
        // console.log(patient_one);

        // Build page elements
        buildBarPlot(patient_one);
        buildBubblePlot(patient_one);
        buildMetaData(patient_one);
        buildGaugePlot(patient_one);
    });
}

// Build barchart
function buildBarPlot(patient) {
    // Parse data
    d3.json(url).then((data) => {
        // Get all data
        let samples = data.samples;
        // Filter by patient number
        let patient_data = samples
            .filter(patient_info => patient_info.id === patient)[0];
        // console.log(patient_data)

    // Get patient info
        // Get OTU ids and labels
        let otuIDs = patient_data.otu_ids;
        let otuIDLabels = patient_data.otu_labels;
        // Get sample values
        let otuSampleValues = patient_data.sample_values;
        // console.log(otuIDs)
        // console.log(otuIDLabels)
        // console.log(otuSampleValues)

        // Slice top ten values
        let otuIDsTopTen = otuIDs.slice(0, 10)
            .map(id => `OTU ${id}`)
            .reverse();
        let otuIDLabelsTopTen = otuIDLabels
            .slice(0, 10)
            .reverse();
        let otuSampleValuesTopTen = otuSampleValues
            .slice(0, 10)
            .reverse();

        // Barchart trace, with sliced values
        let trace1 = {
            x: otuSampleValuesTopTen,
            y: otuIDsTopTen,
            text: otuIDLabelsTopTen,
            type: "bar",
            orientation: "h"
        }

        let barLayout = {
            title: `Top 10 OTUs for Subject #${patient}`,
            yaxis: {title: "OTU ID"},
            xaxis: {title: "sample_value",}
        }

        // Call on plot
        Plotly.newPlot("bar", [trace1], barLayout)
    });
}

// Build bubble plot
function buildBubblePlot(patient) {
    // Parse data
    d3.json(url).then((data) => {
        // Get all data
        let samples = data.samples;
        // Filter by patient number
        let patient_data = samples
            .filter(patient_info => patient_info.id === patient)[0];
        // console.log(patient_data)

        // Get patient info
        // Get OTU ids and labels
        let otuIDs = patient_data.otu_ids;
        let otuIDLabels = patient_data.otu_labels;
        // Get sample values
        let otuSampleValues = patient_data.sample_values;
        // console.log(otuIDs)
        // console.log(otuIDLabels)
        // console.log(otuSampleValues)

        // Barchart trace, with sliced values
        let trace1 = {
            x: otuIDs,
            y: otuSampleValues,
            mode: "markers",
            marker: {
                size: otuSampleValues,
                color: otuIDs,
                colorscale: "Earth"
            },
            text: otuIDLabels,
            type: "bubble"
        }

        let barLayout = {
            title: `Top 10 OTUs for Subject #${patient}`,
            xaxis: {title: "sample_value"}
        }

        // Call on plot
        Plotly.newPlot("bubble", [trace1], barLayout)
    });
}

// Build patient profile
function buildMetaData(patient) {
    // Parse data
    d3.json(url).then((data) => {
        // Get all data
        let samples = data.metadata;
        // console.log(samples);
        // Filter by patient number, get values
        let values = samples.filter(patient_info => patient_info.id == patient)[0];
        // console.log(values);

        // Reset field
        d3.select("#sample-metadata").html("")
        // Append to metadata container
        Object.entries(values).forEach(([key,value]) => {
            d3.select("#sample-metadata")
                .append('p')
                .text(`${key}: ${value}`);
        });
    });
}

// ========================================
// BONUS
// ========================================
// Build gauge plot
function buildGaugePlot(patient) {
    // Parse data
    d3.json(url).then((data) => {
        // Get all data
        let samples = data.metadata;
        // Filter by patient number and wash number
        let patient_data = samples
            .filter(patient_info => patient_info.id == patient)[0];
        // console.log(patient_data['wfreq'])


        // Gauge plot trace
        let trace1 = {
            domain: {x: [0,1], y: [0,1]},
            value: patient_data['wfreq'],
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {range: [null, 10],
                    tickmode: "linear",
                    showticklabels: true},
                bar: {color: "#710000"},
                steps: [
                    {range: [0, 1], color: "#F6F2EB"},
                    {range: [1, 2], color: "#F4F0E9"},
                    {range: [2, 3], color: "#F3F0E9"},
                    {range: [3, 4], color: "#E8E5C8"},
                    {range: [4, 5], color: "#E5E7B1"},
                    {range: [5, 6], color: "#D9E49C"},
                    {range: [6, 7], color: "#BCCB92"},
                    {range: [7, 8], color: "#9BBE88"},
                    {range: [8, 9], color: "#98BA8E"},
                    {range: [9, 10], color: "#92B389"},
                ]
            }};

        let gaugeLayout = {
            title: {
                text: 'Belly Button Scrubs per Week',
                size: 18,
                color: "black"
            }
        }
        // Call on plot
        Plotly.newPlot("gauge", [trace1], gaugeLayout)
    });
}

function optionChanged(patientValue) {
    buildBarPlot(patientValue)
    buildBubblePlot(patientValue)
    buildMetaData(patientValue)
    buildGaugePlot(patientValue)
};


// Call on init()
init();