// --- DATA & STATE ---
const roomTypes = {
    'single': { label: 'Single Bed', price: 100, icon: 'fa-user' },
    'double': { label: 'Double Bed', price: 180, icon: 'fa-user-group' },
    'suite': { label: 'Luxury Suite', price: 350, icon: 'fa-gem' }
};

// Initialize Rooms
let rooms = [
    { id: 101, type: 'single', status: 'available' },
    { id: 102, type: 'single', status: 'booked' },
    { id: 103, type: 'double', status: 'available' },
    { id: 104, type: 'double', status: 'available' },
    { id: 201, type: 'single', status: 'cleaning' },
    { id: 202, type: 'suite', status: 'available' },
    { id: 203, type: 'suite', status: 'booked' },
    { id: 301, type: 'double', status: 'available' }
];

// Initialize Bookings (Mock Data)
let bookings = [
    { id: 1, roomId: 102, guest: "Alice Smith", checkIn: "2023-11-01", checkOut: "2023-11-05", status: "Active" },
    { id: 2, roomId: 203, guest: "Robert Downey", checkIn: "2023-10-28", checkOut: "2023-11-02", status: "Active" }
];

// --- CORE FUNCTIONS ---

function init() {
    renderDashboard();
    renderRooms();
    renderBookings();
    
    // Set default date inputs to today/tomorrow
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('check-in').valueAsDate = today;
    document.getElementById('check-out').valueAsDate = tomorrow;
}

// Navigation Switcher
function showSection(sectionId) {
    // Update UI content
    document.querySelectorAll('.section').forEach(el => el.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');

    // Update Nav State
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const activeNav = document.getElementById('nav-' + sectionId);
    if(activeNav) activeNav.classList.add('active');

    // Close mobile sidebar if open
    const sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('open') && window.innerWidth < 768) {
        sidebar.classList.remove('open');
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

// Render Dashboard Stats
function renderDashboard() {
    const total = rooms.length;
    const available = rooms.filter(r => r.status === 'available').length;
    const booked = rooms.filter(r => r.status === 'booked').length;

    document.getElementById('stat-total').innerText = total;
    document.getElementById('stat-available').innerText = available;
    document.getElementById('stat-booked').innerText = booked;

    // Render Recent Table
    const recentBody = document.getElementById('dashboard-table-body');
    recentBody.innerHTML = '';
    
    if(bookings.length === 0) {
        document.getElementById('empty-dashboard-msg').style.display = 'block';
    } else {
        document.getElementById('empty-dashboard-msg').style.display = 'none';
        // Show last 3 bookings
        bookings.slice(-3).reverse().forEach(b => {
            const room = rooms.find(r => r.id == b.roomId);
            const row = `
                <tr>
                    <td><strong>${b.guest}</strong></td>
                    <td style="color: #64748b;">${roomTypes[room.type].label} (#${b.roomId})</td>
                    <td style="color: #64748b;">${b.checkIn}</td>
                    <td><span class="badge active">Active</span></td>
                </tr>
            `;
            recentBody.innerHTML += row;
        });
    }
}

// Render Room Cards
function renderRooms() {
    const container = document.getElementById('rooms-grid');
    container.innerHTML = '';

    rooms.forEach(room => {
        const info = roomTypes[room.type];
        let statusClass = '';
        let statusLabel = '';
        let btnAction = '';

        if (room.status === 'available') {
            statusClass = 'available';
            statusLabel = 'Available';
            btnAction = `<button onclick="openBookingModal(${room.id})" class="btn btn-primary">Book Now</button>`;
        } else if (room.status === 'booked') {
            statusClass = 'booked';
            statusLabel = 'Booked';
            btnAction = `<button disabled class="btn btn-disabled">Occupied</button>`;
        } else {
            statusClass = 'cleaning';
            statusLabel = 'Cleaning';
            btnAction = `<button onclick="markAvailable(${room.id})" class="btn btn-outline">Mark Ready</button>`;
        }

        const card = `
            <div class="card room-card">
                <div class="room-header">
                    <div class="room-icon">
                        <i class="fa-solid ${info.icon}"></i>
                    </div>
                    <span class="badge ${statusClass}">${statusLabel}</span>
                </div>
                
                <div class="room-title">Room ${room.id}</div>
                <div class="room-type">${info.label}</div>
                
                <div class="price-tag">
                    <span class="price-amount">$${info.price}</span>
                    <span class="price-period">/ night</span>
                </div>

                ${btnAction}
            </div>
        `;
        container.innerHTML += card;
    });
}

// Render Bookings Table
function renderBookings() {
    const tbody = document.getElementById('bookings-table-body');
    tbody.innerHTML = '';

    if (bookings.length === 0) {
        document.getElementById('no-bookings-msg').style.display = 'block';
        return;
    }
    document.getElementById('no-bookings-msg').style.display = 'none';

    bookings.forEach(b => {
        const room = rooms.find(r => r.id == b.roomId);
        const row = `
            <tr>
                <td style="font-weight: bold; color: var(--secondary);">#${b.id}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="width: 30px; height: 30px; background: #e2e8f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #64748b; font-size: 0.8rem;">
                            ${b.guest.charAt(0)}
                        </div>
                        <span style="font-weight: 500;">${b.guest}</span>
                    </div>
                </td>
                <td style="color: #64748b;">Room ${b.roomId}</td>
                <td style="color: #64748b;">${b.checkIn}</td>
                <td style="color: #64748b;">${b.checkOut}</td>
                <td><span class="badge active">Active</span></td>
                <td style="text-align: center;">
                    <button onclick="checkOut(${b.id})" class="btn-icon" title="Check Out">
                        <i class="fa-solid fa-right-from-bracket"></i>
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// --- INTERACTION LOGIC ---

function markAvailable(roomId) {
    const room = rooms.find(r => r.id === roomId);
    if (room) {
        room.status = 'available';
        showToast(`Room ${roomId} is now ready.`);
        renderRooms();
        renderDashboard();
    }
}

function openBookingModal(roomId) {
    const room = rooms.find(r => r.id === roomId);
    const info = roomTypes[room.type];
    
    document.getElementById('booking-room-id').value = roomId;
    document.getElementById('modal-room-number').innerText = roomId;
    document.getElementById('modal-price').innerText = `$${info.price}`;
    
    document.getElementById('booking-modal').classList.add('open');
}

function closeModal() {
    document.getElementById('booking-modal').classList.remove('open');
    document.getElementById('booking-form').reset();
}

// Handle Form Submission
document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const roomId = parseInt(document.getElementById('booking-room-id').value);
    const guest = document.getElementById('guest-name').value;
    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;

    // 1. Add to bookings
    const newBooking = {
        id: bookings.length > 0 ? bookings[bookings.length-1].id + 1 : 1,
        roomId: roomId,
        guest: guest,
        checkIn: checkIn,
        checkOut: checkOut,
        status: "Active"
    };
    bookings.push(newBooking);

    // 2. Update Room Status
    const room = rooms.find(r => r.id === roomId);
    room.status = 'booked';

    // 3. Refresh UI
    renderRooms();
    renderBookings();
    renderDashboard();
    closeModal();
    showToast(`Room ${roomId} booked successfully!`);
});

function checkOut(bookingId) {
    if(confirm('Check out this guest and mark room as cleaning?')) {
        // Find booking
        const bookingIndex = bookings.findIndex(b => b.id === bookingId);
        if (bookingIndex > -1) {
            const roomId = bookings[bookingIndex].roomId;
            
            // Remove booking
            bookings.splice(bookingIndex, 1);
            
            // Set room to cleaning
            const room = rooms.find(r => r.id === roomId);
            if(room) room.status = 'cleaning';

            renderRooms();
            renderBookings();
            renderDashboard();
            showToast('Guest checked out.');
        }
    }
}

// Utility: Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const msg = document.getElementById('toast-msg');
    msg.innerText = message;
    
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Start App
init();