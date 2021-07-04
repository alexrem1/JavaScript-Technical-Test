// advantage of a seperate function for retrieving data is the ability to check the properties, add logic etc

async function cardiffJSON() {
  // return (await fetch("task2_cardiff.json")).json if you're not going to manipulate data because response object json promise has already been returned
  // or below if you want to manipulate data as we are still awaiting

  // using await allows me to wait until a promise has been settled
  const cardiff = await fetch("task2_cardiff.json");
  // still awaiting the promise to convert response to json
  const dataCardiff = await cardiff.json();

  // logic to manipulate data
  // sorted cardiff object by date and mapped result to return desired output
  dataCardiff.sort((a, b) => a.date - b.date);
  const dataCarMap = dataCardiff.map((yes) => {
    return { date: yes.date, Cardiff: yes.high };
  });
  return dataCarMap;
}

async function belfastJSON() {
  const belfast = await fetch("task2_belfast.json");
  const dataBelfast = await belfast.json();

  // logic to manipulate data
  // mapped data to return desired output in a array eg belfast temp array
  const dataBelMap = dataBelfast.map((output) => {
    return output.high;
  });
  return dataBelMap;
}

// as soon as the document is ready, async loads the data eg cardiff and belfast
document.addEventListener("DOMContentLoaded", async () => {
  try {
    cardiff = await cardiffJSON();
    belfast = await belfastJSON();

    // inserted modified belfast array of data
    cardiff.forEach((a, key) => {
      a.Belfast = belfast[key];
    });

    const merge = [...cardiff];

    // desired output
    console.log(merge);
    console.log(JSON.stringify(merge));
  } catch (error) {
    // if error
    console.log("Error!");
    console.log(error);
  }
});
