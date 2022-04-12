using API.Models.Interfaces;
using MySql.Data.MySqlClient;

namespace API.Models
{
    public class CreateSongsTable : ICreateSongsTable
    {
        public void CreateTable()
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"CREATE TABLE songs(id INTEGER PRIMARY KEY AUTO_INCREMENT, song_title TEXT, song_time_stamp DATETIME, deleted TEXT, favorited TEXT)";
            using var cmd = new MySqlCommand(stm, con);

            cmd.ExecuteNonQuery();
        }
    }
}