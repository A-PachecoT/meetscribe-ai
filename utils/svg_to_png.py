import os
import cairosvg


def convert_svg_to_png(svg_path, png_path, size):
    with open(svg_path, "rb") as svg_file:
        cairosvg.svg2png(
            file_obj=svg_file, write_to=png_path, output_width=size, output_height=size
        )


def main():
    sizes = [16, 48, 128]

    # Get the absolute path to the project root directory
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    icons_dir = os.path.join(project_root, "icons")

    for size in sizes:
        svg_path = os.path.join(icons_dir, f"icon{size}.svg")
        png_path = os.path.join(icons_dir, f"icon{size}.png")

        if os.path.exists(svg_path):
            convert_svg_to_png(svg_path, png_path, size)
            print(f"Converted icon{size}.svg to icon{size}.png")
        else:
            print(f"Warning: icon{size}.svg not found")


if __name__ == "__main__":
    main()
