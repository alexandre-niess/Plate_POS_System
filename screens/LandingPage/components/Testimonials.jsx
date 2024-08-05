import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';

const userTestimonials = [
  {
    avatar: <Avatar alt="Lucas Mendes" src="/static/images/avatar/1.jpg" />,
    name: 'Lucas Mendes',
    occupation: 'Contador',
    testimonial:
      "Finalmente encontrei um emissor de notas que é intuitivo! O Valle simplificou todo o processo para mim, tornando a emissão de NFs uma tarefa rápida e sem complicações.",
  },
  {
    avatar: <Avatar alt="Ana Silva" src="/static/images/avatar/2.jpg" />,
    name: 'Ana Silva',
    occupation: 'Contadora',
    testimonial:
      "O recurso de agendamento do Valle é um verdadeiro salva-vidas para minha empresa. Agora posso programar as emissões com antecedência e manter tudo organizado sem o estresse de última hora.",
  },
  {
    avatar: <Avatar alt="Mariana Santos" src="/static/images/avatar/3.jpg" />,
    name: 'Mariana Santos',
    occupation: 'Contadora',
    testimonial:
      'O dashboard do Valle é uma maravilha! Com apenas um olhar, consigo ter uma visão completa das informações essenciais das NFs emitidas. Isso facilitou muito o acompanhamento e controle do meu negócio.',
  },
  {
    avatar: <Avatar alt="Rafael Oliveira" src="/static/images/avatar/4.jpg" />,
    name: 'Rafael Oliveira',
    occupation: 'Contador',
    testimonial:
      "Estou impressionado com a simplicidade do Valle. Já utilizei outros emissores que me deixavam confuso, mas este é tão fácil de usar que até mesmo minha equipe menos experiente consegue lidar com ele sem problemas.",
  },
  {
    avatar: <Avatar alt="Carolina Lima" src="/static/images/avatar/5.jpg" />,
    name: 'Carolina Lima',
    occupation: 'Contadora',
    testimonial:
      "O Valle realmente entende as necessidades dos seus usuários. A interface amigável e as funcionalidades inteligentes tornaram minha vida muito mais fácil. Recomendo sem hesitação!",
  },
  {
    avatar: <Avatar alt="Thiago Costa" src="/static/images/avatar/6.jpg" />,
    name: 'Thiago Costa',
    occupation: 'Contador',
    testimonial:
      "Como contador, sempre estou em busca de ferramentas que facilitem o trabalho dos meus clientes. O Emissor de NFS-e Valle não só atende às minhas expectativas, como as supera. É uma solução indispensável para qualquer empresa que deseje simplificar sua gestão de notas fiscais.",
  },
];


const logoStyle = {
  width: '64px',
  opacity: 0.3,
};

export default function Testimonials() {
  const theme = useTheme();

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Opiniões
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Veja o que os nossos clientes tem a dizer sobre o Emissor de NFS-e Valle. Descubra como entregamos eficiência, durabilidade e satisfação. Junte-se a nós pela qualidade, inovação e suporte confiável.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {userTestimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
                p: 1,
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  pr: 2,
                }}
              >
                <CardHeader
                  avatar={testimonial.avatar}
                  title={testimonial.name}
                  subheader={testimonial.occupation}
                />

              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
