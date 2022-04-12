namespace API.Models
{
    public class ConnectionString
    {
        public string cs {get; set;}

        public ConnectionString()
        {
            string server = "acw2033ndw0at1t7.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
            string database = "pitxrbjmqzb11rir";
            string port = "3306";
            string username = "pne98tbgq4vk3bl7";
            string password = "um2hohkyhdjmrsnz";

            cs = $@"server={server}; username={username}; database={database}; port={port}; password={password}";
        }
    }
}