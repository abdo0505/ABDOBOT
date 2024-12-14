import { createHash } from 'crypto';

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;

let handler = async function (m, { conn, text, usedPrefix, command }) {

  let user = global.db.data.users[m.sender];

  let name2 = conn.getName(m.sender);

  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender;

  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/1861aab98389b13db8588.jpg');

  if (user.registered === true) 
    throw `*✿ Ya estás registrado*\n\n¿Quiere volver a registrarse?\n\n🔒 Use este comando para *eliminar su registro*\n*${usedPrefix}unreg* <Número de serie>`;

  if (!Reg.test(text)) 
    throw `*✿ Formato incorrecto*\n\n📜 Uso del comando: *${usedPrefix + command} nombre.edad*\n💡 Ejemplo : *${usedPrefix + command}* ${name2}.18`;

  let [_, name, splitter, age] = text.match(Reg);

  if (!name) throw '*📜 El nombre no puede estar vacío*';

  if (!age) throw '*📜 La edad no puede estar vacía*';

  if (name.length >= 30) throw '*✿ El nombre es demasiado largo*'; 

  age = parseInt(age);

  if (age > 100) throw '*🦸‍♂️ Wow el abuelo quiere jugar al bot*';

  if (age < 5) throw '*🍼 hay un bebé jsjsj*';

  user.name = name.trim();
  user.age = age;
  user.regTime = +new Date();
  user.registered = true;

  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6);  

  let regbot = `🔒 *R E G I S T R A D O*  🔒

✔️ *Nombre:* ${name}

👤 *Edad* : ${age} años

🔑 *Número de serie*:

${sn}`;

  await m.reply(regbot);

};

handler.help = ['reg'];

handler.tags = ['rg'];

handler.command = ['new-account', 'reg'];

export default handler;
