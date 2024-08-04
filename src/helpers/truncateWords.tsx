"use client";
export function TruncateWord(text: string, wordlimit: number): string{
    let wordLength = text.length;
    if(wordLength <= wordlimit){
        return text;
    }
    
    const newWord = text.slice(0, wordlimit);
    return newWord;
}