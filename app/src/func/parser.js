const parse = async (array, coreNum, taskNum) => {
    array.splice(0, 0, 0); // 모듈러 연산으로 파싱하기 위해 0번째에 빈 값 넣기
    var core = [];
    for (var i = 0; i < Number(coreNum); i++) {
        core[i] = [];
    }
    var task = [];
    for (var i = 0; i < Number(taskNum); i++) {
        task[i] = [];
    }
    var core_i = 0;
    for (i in array) {
        if (i % (Number(coreNum) + 2) == 0 || i % (Number(coreNum) + 2) == 1) {
            core_i = 0;
            continue;
        }
        var post_ex = array[i].split('\t');
        post_ex.shift();                    // core${i} 제거
        const ex = post_ex.filter(Boolean); // 빈 문자열 제거
        
        if (ex.length != Number(taskNum)) { // 데이터가 누락된 경우
            throw new Error();
        }
        
        for (var k = 0; k < ex.length; k++) {
            try {
                core[core_i].push(Number(ex[k])); // Number로 형 변환이 불가한 경우
                task[k].push(Number(ex[k]))
            } catch (e) {
                throw new e;
            }
        }
        core_i++;
    }
    return [core, task];
};

module.exports = parse;