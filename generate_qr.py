import qrcode

def create_qr_from_text(texto: str, filename: str = "qr-code.png",
                        box_size: int = 10, border: int = 4):
    """
    Gera um QR code a partir de um texto puro (mantendo quebras de linha e tabs).
    """
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=box_size,
        border=border,
    )
    qr.add_data(texto)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    img.save(filename)
    print(f"✅ QR code salvo em: {filename}")

if __name__ == "__main__":
    texto = "https://keven-martins.github.io/inventario-modems/"  
    arquivo_qr = "qr-code.png"
    create_qr_from_text(texto, arquivo_qr)