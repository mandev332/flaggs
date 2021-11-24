function getPalindrom(s){
    let newWord = []
    for(let j of s){

        if((j.charCodeAt()>=97 && j.charCodeAt()<=122)||
        (j.charCodeAt()>=65 && j.charCodeAt()<=90) || j.match(/[0-9]/)){
            newWord.push(j.toLowerCase())
        }
    }
    let lst = [...newWord]
    lst.reverse()
    for(let j=0;j<lst.length;j++){
        if(lst[j]!=newWord[j]){
            return false
        }
    }
    return true
}


// console.log(getPalindrom("A man, a plan, a canal: Panama"))

function insection(lst1,lst2){
    let newLst = []
    for(let j of lst1){
        if(lst2.includes(j)){
            newLst.push(j)
        }
    }
    return newLst
}[2,2]
let nums1 = [4,9,5]
let nums2 = [9,4,9,8,4]
// console.log(insection(nums1,nums2))


function numInStr(lst){
    let newLst = []
    for(let j of lst) if(j.match(/[0-9]/g)) newLst.push(j)
    return newLst
}

console.log(numInStr(["1a", "a", "2b", "b"]))