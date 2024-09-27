import os
import xml.etree.ElementTree as ET


def create_svg_icon(size, output_path):
    # Create the SVG element
    svg = ET.Element(
        "svg",
        {
            "width": str(size),
            "height": str(size),
            "viewBox": f"0 0 {size} {size}",
            "xmlns": "http://www.w3.org/2000/svg",
        },
    )

    # Create the background circle
    ET.SubElement(
        svg,
        "circle",
        {
            "cx": str(size // 2),
            "cy": str(size // 2),
            "r": str(size // 2 - 2),
            "fill": "#4285F4",
        },
    )

    # Create the microphone icon
    microphone_path = (
        f"M{size//2},{size//4} "
        f"v{size//2} "
        f"M{size//3},{size//2} "
        f"q0,{size//6} {size//3},0"
    )
    ET.SubElement(
        svg,
        "path",
        {
            "d": microphone_path,
            "stroke": "white",
            "stroke-width": str(size // 16),
            "stroke-linecap": "round",
            "fill": "none",
        },
    )

    # Create the XML tree and save it to a file
    tree = ET.ElementTree(svg)
    tree.write(output_path, encoding="unicode", xml_declaration=True)


def main():
    sizes = [16, 48, 128]

    # Get the absolute path to the project root directory
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    icons_dir = os.path.join(project_root, "icons")

    # Create the icons directory if it doesn't exist
    os.makedirs(icons_dir, exist_ok=True)

    for size in sizes:
        output_path = os.path.join(icons_dir, f"icon{size}.svg")
        create_svg_icon(size, output_path)
        print(f"Created icon: {output_path}")


if __name__ == "__main__":
    main()
