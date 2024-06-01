const api = axios.create({
  baseURL: 'https://api.thecatapi.com/v1'
});
api.defaults.headers.common['X-API-KEY'] = 'live_NFS1Fq5Yvuxx0bhEiUr5E08gtIiyKvv5gEMiPVcm0WaIWTC4y1tzjjRrKnMnofXN';



const API_URL_RANDOM ='https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_NFS1Fq5Yvuxx0bhEiUr5E08gtIiyKvv5gEMiPVcm0WaIWTC4y1tzjjRrKnMnofXN';
const API_URL_FAVO ='https://api.thecatapi.com/v1/favourites';
const API_URL_FAVO_DELETE =(id)=>`https://api.thecatapi.com/v1/favourites/${id}?api_key=live_NFS1Fq5Yvuxx0bhEiUr5E08gtIiyKvv5gEMiPVcm0WaIWTC4y1tzjjRrKnMnofXN`;

const API_URL_UPLOAD ='https://api.thecatapi.com/v1/images/upload';


const spanError = document.getElementById('error')
async function loadRandomCat(){
    
    const response = await fetch(API_URL_RANDOM);
    const data = await response.json();
    console.log('RANDOM')
    console.log(data);

    if (response.status !==200) {
        spanError.innerHTML="Hubo un error" + response.status + data.message;
    }else{

        const img1 = document.getElementById('img1')
        const img2 = document.getElementById('img2')
        const btn1 = document.getElementById('btn1')
        const btn2 = document.getElementById('btn2')

        img1.src = data[0].url;
        img2.src = data[1].url;
        btn1.onclick = () => savefavoriteCat(data[0].id);
        btn2.onclick = () => savefavoriteCat(data[1].id);

    }


}

async function loadfavoriteCat() {

    const response = await fetch(API_URL_FAVO,{
      method:'GET',
      headers:{
        'X-API-KEY':'live_NFS1Fq5Yvuxx0bhEiUr5E08gtIiyKvv5gEMiPVcm0WaIWTC4y1tzjjRrKnMnofXN'
      }
    });
    const data = await response.json();
    console.log('FAVORITOS')
    console.log(data);
    if (response.status !==200) {
        spanError.innerHTML="Hubo un error" + response.status + data.message;
    }else{
        const  section = document.getElementById('favorito')
        section.innerHTML='';
        const h2 = document.createElement('h2');
        const h2Text =document.createTextNode('Gatos Favoritos');
        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.forEach(gatos =>{
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText =document.createTextNode('Sacar de Favorito');

            img.src = gatos.image.url
            img.width =150

            btn.appendChild(btnText);
            btn.onclick = () =>deleteFavoriteCat(gatos.id)
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        });
    }
}

async function savefavoriteCat(id) {

    // const response = await fetch(API_URL_FAVO, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'X-API-KEY':'live_NFS1Fq5Yvuxx0bhEiUr5E08gtIiyKvv5gEMiPVcm0WaIWTC4y1tzjjRrKnMnofXN',
    //     },
    //     body: JSON.stringify({
    //       image_id: id
    //     }),
    //   });
    //   const data = await response.json();
      const { data, status } = await api.post('/favourites', {
        image_id: id,
      });
    
      console.log('Save')
      // console.log(response)
    
      if (status !== 200) {
        spanError.innerHTML = "Hubo un error: " + status + data.message;
      }else{
        console.log('Guardado en Favoritos');
        loadfavoriteCat()
      }
}

async function deleteFavoriteCat(id){
    const response = await fetch(API_URL_FAVO_DELETE(id), {
        method: 'DELETE',
        headers: {
          'X-API-KEY':'live_NFS1Fq5Yvuxx0bhEiUr5E08gtIiyKvv5gEMiPVcm0WaIWTC4y1tzjjRrKnMnofXN',
        },
    });
      const data = await response.json();
    
      console.log('eliminado')
      console.log(response)
    
      if (response.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + response.status + data.message;
      }else{
        console.log('Eliminado de Favoritos');
        loadfavoriteCat();
      }
}
async function subirfoto(){
  const form = document.getElementById('uploadingForm')
  const formDara = new FormData(form);

  console.log(formDara.get('file'));
  const response = await fetch(API_URL_UPLOAD,{
    method:'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      'X-API-KEY':'live_NFS1Fq5Yvuxx0bhEiUr5E08gtIiyKvv5gEMiPVcm0WaIWTC4y1tzjjRrKnMnofXN',
    },
    body:formDara

  });
}
loadRandomCat();
loadfavoriteCat();
