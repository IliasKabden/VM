using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VM.Models;

namespace VM.Controllers
{
    public class AdminController : Controller
    {
        Dbo DB = new Dbo();

        // GET: Admin
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult All()
        {
            return PartialView("PartialViewAll", DB.ListAll());
        }

        // POST: Admin/Create
        [HttpPost]
        public JsonResult Create(Product product, HttpPostedFileBase upload)
        {
            try
            {
                return Json(DB.Add(product), JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json("");
            }
        }

        // GET: Admin/Details/5
        public JsonResult Details(int ID)
        {
            var Training = DB.ListAll().Find(x => x.id.Equals(ID));
            return Json(Training, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult SaveFilePath(HttpPostedFileBase fileInput)
        {
            if (fileInput.ContentType.Contains("image"))
            {
                string fileName = fileInput.FileName;
                var image = new Bitmap(fileInput.InputStream, false);
                image.Save(Path.Combine(HttpContext.Server.MapPath("/images/"), fileName));
                return Json(fileName);
            }
            else
            {
                return Json("");
            }

        }
        // POST: Admin/Edit/5
        [HttpPost]
        public ActionResult Edit(int id,Product product)
        {
            try
            {
                return Json(DB.Update(product), JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json("");
            }
        }

        // POST: Admin/Delete/5
        [HttpPost]
        public JsonResult Delete(int id)
        {
            try
            {
                return Json(DB.Delete(id), JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json("");
            }
        }
    }
}
