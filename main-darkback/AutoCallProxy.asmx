<%@ WebService Language="C#" Class="AutoCallProxy" %>

using System;
using System.IO;
using System.Net;
using System.Text;
using System.Web.Services;
using System.Xml;

[WebService(Namespace = "http://tempuri.org/")]
[System.Web.Script.Services.ScriptService]
public class AutoCallProxy : WebService
{
    [WebMethod]
    public string GetAutoCall(string username)
    {
        try
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

            string url = "https://bravo.beacukai.go.id/omni/Apps/asmx/TrmUserManagement.asmx/BRA_DynamicData";

            var request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "POST";
            request.ContentType = "application/json; charset=utf-8";

            request.UserAgent = "Mozilla/5.0";
            request.Accept = "*/*";

            string payload = "{\"TrxID\":\"0\",\"TrxUserName\":\"" + username + "\",\"TrxAction\":\"UIDESK009\"}";
            byte[] bytes = Encoding.UTF8.GetBytes(payload);

            using (var stream = request.GetRequestStream())
            {
                stream.Write(bytes, 0, bytes.Length);
            }

            string result = "";

            using (var response = (HttpWebResponse)request.GetResponse())
            using (var reader = new StreamReader(response.GetResponseStream()))
            {
                result = reader.ReadToEnd();
            }

            // ================= HANDLE RESPONSE =================

            // 🔥 FORMAT BARU (JSON langsung dari API)
            if (result.Trim().StartsWith("{"))
            {
                return result;
            }

            // 🔥 FORMAT LAMA (XML)
            if (result.Contains("<string"))
            {
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(result);

                var node = doc.GetElementsByTagName("string");

                if (node.Count == 0)
                    return "[]";

                return node[0].InnerText;
            }

            return "ERROR RESPONSE: " + result;
        }
        catch (Exception ex)
        {
            return "ERROR DETAIL: " + ex.ToString();
        }
    }
}