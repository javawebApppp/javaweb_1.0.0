const parse = (array) => {
    array.splice(0, 0, 0); // 모듈러 연산으로 파싱하기 위해 0번째에 빈 값 넣기
        var core = [];
        for (var i = 0; i < 5; i++){
            core[i] = [];
        }
        var task = [];
        for (var i = 0; i < 5; i++){
            task[i] = [];
        }
        var core_i = 0;

        for(i in array) {
            if(i % 7 == 0 || i % 7 == 1){
                core_i = 0;
                continue;
            }

        var ex = array[i].split('\t');
        ex.pop();
        ex.shift();
        if (ex.length != 5){
            alert('분석 가능한 input을 넣어주세요')
            return res.redirect('/');
        }
        for(var k = 0; k < ex.length; k++){
            try{
                core[core_i].push(Number(ex[k]));
            }catch(e){
                alert('숫자만 분석할 수 있습니다.');
                return res.redirect('/');
            }
        }
        for (var k = 0; k < ex.length; k++){
            task[k].push(Number(ex[k]))
        }
        core_i++;
    }
    // 여기에 console.log가 아닌 db에 저장하는 기능이 들어가야함
    console.log(core); 
    console.log(task);
};

module.exports = parse;