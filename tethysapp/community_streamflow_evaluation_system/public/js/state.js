// ----- CSRF helper (official Django recipe) -----
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (const c of cookies) {
    const [key, value] = c.trim().split('=');
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}
const csrftoken = getCookie('csrftoken');     // same-origin only

// ----- Event handler attached in <script> tag -----
document.getElementById('state-eval-form').addEventListener('submit', updateData);

function updateData(event) {
    console.log('updateData() called');

    event.preventDefault();                     // stop normal navigation
   let start_date = document.getElementById("start-date").value
    let end_date = document.getElementById("end-date").value
    let state_id = document.getElementById("state_id").value
    let model_id = document.getElementById("model_id").value

    var data = new URLSearchParams();
    data.append('method', 'update_state_eval_data');
    data.append('start_date', start_date);
    data.append('end_date', end_date);
    data.append('state_id', state_id);
    data.append('model_id', model_id);
  fetch('.', {                                   // “.” = current view URL
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-CSRFToken': csrftoken                   
    },
     body: data
  })
  .then(resp => resp.ok ? resp.json() : Promise.reject(resp))
  .then(data => {
    console.log('Server replied:', data);
    TETHYS_MAP_VIEW.reInitializeMap();
    // TODO: refresh layers, update map, etc.
  })
  .catch(err => console.error('REST call failed:', err));
}
