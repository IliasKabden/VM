using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VM.Models;

namespace VM.Controllers
{
    public class HomeController : Controller
    {
        Dbo DB = new Dbo();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            return Json(DB.ListAll(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}