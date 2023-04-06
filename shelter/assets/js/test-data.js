export { testData }

function testData(data) {

    const splitArr = (perPage) => {
        return data.reduce((acc, _, i) => {
            if (i % perPage === 0 && i < data.length - 1) {
                const subarray = [];
                for (let j = 0; j < perPage; j++) {
                    subarray.push(data[i + j])
                }
                acc.push(subarray)
            }
            return acc;
        }, [])
    }

    const perPage8 = splitArr(8);
    const perPage6 = splitArr(6);
    const perPage3 = splitArr(3);

    const dataRepeatsCount = (data) => {
        const counter = {}
        data.forEach((el) => {
            const elStr = JSON.stringify(el)
            counter[elStr] = (counter[elStr] || 0) + 1
        })
        return Object.values(counter)
    }

    const maxRepeat6 = dataRepeatsCount(data).every(el => el === 6);

    const testRepeat = (arr, pages) => {
        let allUnique = true;
        let repeatOnPage;
        for (let i = 0; i < pages; i++) {
            const set = new Set(arr[i]);
            if (set.size !== arr[i].length) {
                allUnique = false;
                repeatOnPage = i;
                break;
            }
        }
        return allUnique ? allUnique : `${allUnique}, repeat on page ${repeatOnPage}`;
    }

    console.log('**array for all pages:**\n', data,
        '\n\n**array splitted to 8 items per page:**\n', perPage8,
        '\n\n**array splitted to 6 items per page:**\n', perPage6,
        '\n\n**array splitted to 3 items per page:**\n', perPage3,
        '\n\n**every element repeats 6 times:** ', maxRepeat6,
        '\n**no repeats every 8 elements:** ', testRepeat(perPage8, 6),
        '\n**no repeats every 6 elements:** ', testRepeat(perPage6, 8),
        '\n**no repeats every 3 elements:** ', testRepeat(perPage3, 16),
    )
}