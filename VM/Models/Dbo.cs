using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace VM.Models
{
    public class Dbo
    {

        string cs = ConfigurationManager.ConnectionStrings["ConString"].ConnectionString;
        public List<Product> ListAll()
        {
            List<Product> lst = new List<Product>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("SelectGoods", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new Product
                    {
                        id = Convert.ToInt32(rdr["id"]),
                        code = rdr["id"].ToString(),
                        Price = Convert.ToInt32(rdr["Price"]),
                        Count = Convert.ToInt32(rdr["Count"]),
                        Name = rdr["Name"].ToString(),
                        SrcImg = rdr["SrcImg"].ToString()
                    });
                }
                return lst;
            }
        }

        //Method for Updating record
        public int Update(Product product)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsertUpdateGoods", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@id", product.id);
                com.Parameters.AddWithValue("@Price", product.Price);
                com.Parameters.AddWithValue("@Count", product.Count);
                com.Parameters.AddWithValue("@Name", product.Name);
                com.Parameters.AddWithValue("@Srcimg", product.SrcImg);
                com.Parameters.AddWithValue("@Action", "Update");
                i = com.ExecuteNonQuery();
            }
            return i;
        }


        //Method for Deleting record
        public int Delete(int ID)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("DeleteGoods", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", ID);
                i = com.ExecuteNonQuery();
            }
            return i;
        }


        //Method for Adding 
        public int Add(Product product)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsertUpdateGoods ", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@id", product.id);
                com.Parameters.AddWithValue("@Price", product.Price);
                com.Parameters.AddWithValue("@Count", product.Count);
                com.Parameters.AddWithValue("@Name", product.Name);
                com.Parameters.AddWithValue("@Srcimg", product.SrcImg);
                com.Parameters.AddWithValue("@Action", "Insert");
                i = com.ExecuteNonQuery();
            }
            return i;
        }
    }
}