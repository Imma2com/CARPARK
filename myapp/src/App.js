const user = localStorage.getItem('username');
const role = localStorage.getItem('role');

if (!user) {
  window.location.href = 'login.html';
} else {
  document.getElementById('userRole').textContent = `${user} (${role})`;
}

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.clear();
  window.location.href = 'login.html';
});
