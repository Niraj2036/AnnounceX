export default function DashboardPage() {
	return (
		<main style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7fafc'}}>
			<div style={{maxWidth: 960, width: '100%', padding: 24, background: '#fff', boxShadow: '0 4px 14px rgba(0,0,0,0.06)', borderRadius: 8}}>
				<h1 style={{fontSize: 32, margin: 0}}>Activities</h1>
				<p style={{color: '#4a5568', marginTop: 8}}>Welcome to your dashboard. Use the sidebar to navigate.</p>
			</div>
		</main>
	)
}
