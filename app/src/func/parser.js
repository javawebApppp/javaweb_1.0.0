const parse = async(array, coreNum, taskNum) => {
    array.splice(0, 0, 0); // 모듈러 연산으로 파싱하기 위해 0번째에 빈 값 넣기
        var core = [];
        for (var i = 0; i < Number(coreNum); i++){
            core[i] = [];
        }
        var task = [];
        for (var i = 0; i < Number(taskNum); i++){
            task[i] = [];
        }
        var core_i = 0;

        for(i in array) {
            if(i % (Number(coreNum)+2) == 0 || i % (Number(coreNum)+2) == 1){
                core_i = 0;
                continue;
            }

        var ex = array[i].split('\t');
        ex.pop();
        ex.shift();
        if (ex.length != Number(taskNum)){
            throw new Error();
        }
        for(var k = 0; k < ex.length; k++){
            try{
                core[core_i].push(Number(ex[k])); // Number로 형 변환이 불가한 경우
            }catch(e){
                throw new e;
            }
        }
        for (var k = 0; k < ex.length; k++){
            try{
                task[k].push(Number(ex[k])) // Number로 형 변환이 불가한 경우
            }catch(e){
                throw new e;
            }
        }
        core_i++;
    }
    // 여기에 console.log가 아닌 db에 저장하는 기능이 들어가야함
    return [core, task];
};

module.exports = parse;