using API.Models.Interfaces;
using MySql.Data.MySqlClient;

namespace API.Models
{
    public class RemoveSong : IDeleteSongs
    {
        public void DeleteSong(int SongID)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            string stm = $@"DELETE FROM songs WHERE id={SongID}";
            using var cmd = new MySqlCommand(stm, con);

            cmd.ExecuteNonQuery();  
        }
    }
}