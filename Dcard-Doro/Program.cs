using Dcard_Doro.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Dcard_Doro
{
    internal static class Program
    {
        private static async Task Main(string[] args)
        {
            var client = new HttpClient
            {
                BaseAddress = new Uri("https://www.dcard.tw"),
            };
            //client.DefaultRequestHeaders.Add("Cookie", "__cfduid=dee5a35874981592fa33ffa366c47925e1540358599; dcard=eyJjc3JmU2VjcmV0IjoiQ0p6UjA2dFRtM3hXLUtQaE1Tc1F0NzVMIn0=; dcard.sig=G95BMTHNwq0XYrhKuuKOHb1ssCI");
            //client.DefaultRequestHeaders.Add("x-csrf-token", "yGLNKTin-ZzdVnBhgW1mZ1Bhl_8BcF-G-rcg");
            var request = new HttpRequestMessage();
            var user = new User("id", "pwd");
            var content = new StringContent(JsonConvert.SerializeObject(user, new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            }), Encoding.UTF8, "application/json");
            var response = await client.PostAsync("/_api/sessions", content).ConfigureAwait(false);
            var contnet = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
            Console.ReadLine();
        }
    }
}
