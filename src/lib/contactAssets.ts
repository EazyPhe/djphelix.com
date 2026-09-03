import photo01 from '../assets/contact/photo-01.txt?raw';
import photo02 from '../assets/contact/photo-02.txt?raw';
import photo03 from '../assets/contact/photo-03.txt?raw';
import photo04 from '../assets/contact/photo-04.txt?raw';
import logo01 from '../assets/contact/logo-01.txt?raw';
import logo02 from '../assets/contact/logo-02.txt?raw';
import logo03 from '../assets/contact/logo-03.txt?raw';
import logo04 from '../assets/contact/logo-04.txt?raw';
import logo05 from '../assets/contact/logo-05.txt?raw';
import logo06 from '../assets/contact/logo-06.txt?raw';
import qr01 from '../assets/contact/qr-01.txt?raw';

export const contactPhotoBase64 = [photo01, photo02, photo03, photo04].join('').replace(/\s/g, '');
export const contactLogoBase64 = [logo01, logo02, logo03, logo04, logo05, logo06].join('').replace(/\s/g, '');
export const contactQrBase64 = qr01.replace(/\s/g, '');

export function decodeBase64(value: string): ArrayBuffer {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes.buffer;
}
