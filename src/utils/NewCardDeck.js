import React from 'react';

const NewCardDeck = () => {
    let arr = [];
    for (let i=1; i<=4; i++){
        for (let j=1; j<=13; j++){
            arr.push(j);
        }
    }
    console.log(arr);
    return arr;
};

export default NewCardDeck;