function makeFunction (count = 20) {
    const arr = [...Array(count)];
    
    const functionStrings = arr.map(countIndex => {
        const str = `
            currentRunIndex = runIndex + i * step
            if (currentRunIndex >= max) return {currentRunIndex: currentRunIndex, i: null};
            callback(currentRunIndex); i++;
        `

        return str; 
    }).join('\n\n')

    const smallLoopFunction = new Function ('runIndex', 'i', 'step', 'max', 'callback', `
        let currentRunIndex = runIndex;
        
        ${functionStrings}
        
        return {currentRunIndex: currentRunIndex, i: i} 
    `)        

    return smallLoopFunction
}

function fastloop (max, index = 0, step = 1, callback, done, functionDumpCount = 10000, frameTimer = 'full', loopCount = 50) {
    let runIndex = index 
    let timer = (callback) => { 
        setTimeout(callback, 0) 
    }
    
    if (frameTimer == 'requestAnimationFrame')  {
        timer = requestAnimationFrame
        functionDumpCount = 1000
    }

    if (frameTimer == 'full') { /* only for loop  */
        timer = null
        functionDumpCount = max 
    }

    

    function runCallback () {

        const smallLoopFunction = makeFunction(loopCount) // loop is call  20 callbacks at once 

        let currentRunIndex = runIndex 
        let ret = {}; 
        let i = 0 
        while(i < functionDumpCount) {
            ret = smallLoopFunction(runIndex, i, step, max, callback)

            if (ret.i == null) {
                currentRunIndex = ret.currentRunIndex
                break; 
            }

            i = ret.i
            currentRunIndex = ret.currentRunIndex
        }

        nextCallback(currentRunIndex)
    }

    function nextCallback (currentRunIndex) {
        if (currentRunIndex) {
            runIndex = currentRunIndex
        } else {
            runIndex += step 
        }

        if (runIndex >= max) {
            done()
            return;  
        }

        if (timer) timer(runCallback)
        else runCallback()
    }

    runCallback()
}

export default fastloop