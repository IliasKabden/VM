using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VM.Models
{
    public class Product
    {
        public int id { get; set; }

        public string code { get; set; }
        public int Price { get; set; }
        public int Count { get; set; }
        public string Name { get; set; }

        public string SrcImg { get; set; }
    }
}