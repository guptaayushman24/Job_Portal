const { spawn } = require('child_process');
const path = require('path');

const scriptPath = path.join(__dirname, 'Python', 'nlp_model.py');

function checkscore(req, res) {
    try {
        // Define user skills and job descriptions
        const { userSkills, jobDescriptions } = req.body;
        console.log(userSkills);
        console.log("The job description is",jobDescriptions);

        if (!userSkills) {
            return res.json({
                'msg': 'User skill not found'
            })
        }
        if (!jobDescriptions) {
            return res.json({
                'msg': 'Job Description not found'
            })
        }


        // Spawn the Python script
        const childPython = spawn('python', [scriptPath]);

        // Write data to Python stdin
        childPython.stdin.write(`${JSON.stringify(userSkills)}\n`); // Add newline
        childPython.stdin.write(`${JSON.stringify(jobDescriptions)}\n`); // Add newline
        childPython.stdin.end(); // Close stdin to signal end of input

        let output = ''; // To capture Python stdout data
        let errorOutput = ''; // To capture Python stderr data

        // Collect data from Python stdout
        childPython.stdout.on('data', (data) => {
            output += data.toString(); // Append data to output
        });

        // Collect error data from Python stderr
        childPython.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        // Handle when Python script finishes execution
        childPython.on('close', (code) => {
            if (code === 0) {
                // Extract the similarity score using a regular expression
                const similarityMatch = output.match(/The similarity is ([\d.]+)/);
                if (similarityMatch && similarityMatch[1]) {
                    const similarityScore = parseFloat(similarityMatch[1]);
                    console.log(`Similarity Score: ${similarityScore}`);

                    // Respond with the similarity score
                    res.status(200).json({
                        message: 'Success',
                        similarityScore: similarityScore,
                    });
                } else {
                    console.error('Similarity score not found in output.');
                    res.status(500).json({ error: 'Failed to extract similarity score.' });
                }


            } else {
                console.error(`Python script exited with code ${code}`);
                return res.status(500).json({ error: errorOutput.trim() || 'Unknown error' });
            }
        });

        // Handle errors while spawning the Python process
        childPython.on('error', (err) => {
            console.error(`Error spawning Python script: ${err.message}`);
            return res.status(500).json({ error: err.message });
        });
    } catch (err) {
        console.error(`Unexpected error: ${err.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    checkscore
}