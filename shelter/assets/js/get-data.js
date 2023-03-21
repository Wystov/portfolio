let petsData;

async function getData() {
    const data = '../../assets/data/pets.json';
    const res = await fetch(data);
    petsData = await res.json();
}

export { petsData, getData };