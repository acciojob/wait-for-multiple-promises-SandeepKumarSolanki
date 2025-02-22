//your JS code here. If required.
      const output = document.getElementById('output');

      // Function to simulate a promise that resolves after a random time
      function createRandomPromise(promiseName) {
        const randomTime = Math.random() * 2 + 1; // Random time between 1 and 3 seconds
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ promiseName, time: randomTime.toFixed(3) });
          }, randomTime * 1000); // Convert to milliseconds
        });
      }

      // Function to create and populate the table with results
      function updateTable(promises) {
        // Clear the existing "Loading..." row
        output.innerHTML = '';

        // Add a row for each promise and its time
        promises.forEach((promiseResult, index) => {
          const row = document.createElement('tr');
          const nameCell = document.createElement('td');
          const timeCell = document.createElement('td');
          nameCell.textContent = `Promise ${index + 1}`;
          timeCell.textContent = promiseResult.time;
          row.appendChild(nameCell);
          row.appendChild(timeCell);
          output.appendChild(row);
        });

        // Add the "Total" row (the time the longest promise took)
        const totalTime = Math.max(...promises.map(p => parseFloat(p.time)));
        const totalRow = document.createElement('tr');
        const totalNameCell = document.createElement('td');
        const totalTimeCell = document.createElement('td');
        totalNameCell.textContent = 'Total';
        totalTimeCell.textContent = totalTime.toFixed(3);
        totalRow.appendChild(totalNameCell);
        totalRow.appendChild(totalTimeCell);
        output.appendChild(totalRow);
      }

      // Show "Loading..." row initially
      output.innerHTML = `<tr id="loading"><td colspan="2" class="text-center">Loading...</td></tr>`;

      // Create the three random promises
      const promise1 = createRandomPromise(1);
      const promise2 = createRandomPromise(2);
      const promise3 = createRandomPromise(3);

      // Use Promise.all to wait for all promises to resolve
      Promise.all([promise1, promise2, promise3])
        .then((results) => {
          // After all promises are resolved, update the table
          updateTable(results);
        })
        .catch((error) => {
          console.error('Error resolving promises:', error);
        });