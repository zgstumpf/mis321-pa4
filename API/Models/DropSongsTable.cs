using API.Models.Interfaces;
using MySql.Data.MySqlClient;

namespace API.Models
{
    public class DropSongsTable : IDropSongsTable
    {
        public void DropTable()
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"DROP TABLE IF EXISTS songs";
            using var cmd = new MySqlCommand(stm, con);

            cmd.ExecuteNonQuery(); 
        }
    }
}