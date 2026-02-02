export default function UserProfile({ user }) {
  if (!user) {
    return (
      <div className="user-profile">
        <p>Please log in to see your profile.</p>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <button className="edit-profile-btn">Edit Profile</button>
    </div>
  );
}
