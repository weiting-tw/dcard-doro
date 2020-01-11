namespace Dcard_Doro.Model
{
    public class User
    {
        public string Email { get; protected set; }
        public string Password { get; protected set; }

        public User(string email, string password)
        {
            Email = email;
            Password = password;
        }
    }
}